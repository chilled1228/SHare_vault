'use client'

import { useState, useEffect } from 'react'
import { authService } from '@/lib/auth-service'
import AdminLayout from '@/components/admin/AdminLayout'
import { AuthProvider } from '@/lib/auth-context'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import { useAuth } from '@/lib/auth-context'
import { Shield, UserCheck, UserX, Crown, RefreshCw } from 'lucide-react'

interface UserData {
  id: string
  email: string
  displayName: string
  photoURL: string
  isAdmin: boolean
  createdAt: any
  updatedAt: any
}

function AdminManagementPageContent() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { user, refreshUser } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUsers()
    }
  }, [user])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const allUsers = await authService.getAllUsers()
      setUsers(allUsers)
    } catch (err) {
      setError('Failed to fetch users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await authService.revokeAdminAccess(userId)
      } else {
        await authService.grantAdminAccess(userId)
      }
      
      // Refresh current user if their status changed
      if (userId === user?.uid) {
        await refreshUser()
      }
      
      await fetchUsers()
      setMessage(`Admin access ${currentStatus ? 'revoked from' : 'granted to'} user successfully`)
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setError(`Failed to ${currentStatus ? 'revoke' : 'grant'} admin access`)
      console.error('Error toggling admin status:', err)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Shield className="mr-2" />
              Admin Management
            </h1>
            <p className="text-gray-600 mt-1">Manage admin access for users</p>
          </div>
          <button
            onClick={refreshUser}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh My Status
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-800">{message}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((userData) => (
                  <tr key={userData.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {userData.photoURL && (
                          <img 
                            src={userData.photoURL} 
                            alt={userData.displayName || userData.email} 
                            className="w-8 h-8 rounded-full mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {userData.displayName || 'Unknown'}
                            {userData.id === user?.uid && (
                              <Crown className="inline ml-1 w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {userData.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{userData.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        userData.isAdmin 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {userData.isAdmin ? (
                          <>
                            <UserCheck className="w-3 h-3 mr-1" />
                            Admin
                          </>
                        ) : (
                          <>
                            <UserX className="w-3 h-3 mr-1" />
                            User
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => toggleAdminStatus(userData.id, userData.isAdmin)}
                        disabled={userData.id === user?.uid}
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          userData.id === user?.uid
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : userData.isAdmin
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {userData.isAdmin ? 'Remove Admin' : 'Make Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">How to use:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Users who sign in are automatically created with isAdmin: false</li>
            <li>• Click "Make Admin" to grant admin access to a user</li>
            <li>• Click "Remove Admin" to revoke admin access</li>
            <li>• You cannot remove your own admin access</li>
            <li>• Admins can access the admin dashboard and manage content</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
}

export default function AdminManagementPage() {
  return <AdminManagementPageContent />
}