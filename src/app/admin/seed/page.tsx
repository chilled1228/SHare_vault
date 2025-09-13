'use client'

import { useState } from 'react'
import { BlogService } from '@/lib/blog-service'
import { authService } from '@/lib/auth-service'
import { seedDatabase } from '@/lib/seed-data'
import AdminLayout from '@/components/admin/AdminLayout'
import { AuthProvider } from '@/lib/auth-context'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import { useAuth } from '@/lib/auth-context'

function AdminSeedPageContent() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { user } = useAuth()

  const handleSeed = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      await seedDatabase()
      setMessage('Database seeded successfully! 6 sample posts created.')
    } catch (err) {
      setError('Failed to seed database. Check Firebase configuration and try again.')
      console.error('Seeding error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleMakeAdmin = async () => {
    if (!user) {
      setError('You must be logged in to make yourself an admin')
      return
    }

    setLoading(true)
    setMessage('')
    setError('')

    try {
      await authService.grantAdminAccess(user.uid)
      setMessage('You are now an admin! Please refresh the page.')
    } catch (err) {
      setError('Failed to grant admin access. Check Firebase configuration and try again.')
      console.error('Admin grant error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Seeding</h1>
          <p className="text-gray-600">Seed your database with sample posts</p>
        </div>

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

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Create a Firebase project named "sharevault-site"</li>
              <li>Enable Firestore Database and Cloud Storage</li>
              <li>Copy your Firebase config to .env.local</li>
              <li>Deploy security rules from firestore.rules and storage.rules</li>
              <li>Click the button below to seed sample data</li>
            </ol>
          </div>

          <div className="mb-6">
            <button
              onClick={handleSeed}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Seeding...' : 'Seed Sample Posts'}
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Sample Posts to be Created:</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• The Future of Web Development: Trends to Watch in 2025</li>
              <li>• Mastering React Server Components: A Complete Guide</li>
              <li>• Building Accessible Web Applications: Essential Guidelines</li>
              <li>• CSS Grid vs Flexbox: When to Use Which Layout System</li>
              <li>• TypeScript Best Practices for Large Applications</li>
              <li>• Performance Optimization: Modern Web Techniques</li>
            </ul>
          </div>
        </div>
      </div>
        
        {/* Admin Setup Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Admin Setup</h2>
            <p className="text-gray-700 mb-4">
              Make yourself an admin to access all admin features. 
              {user && (
                <span className="block mt-2">
                  Current user: <strong>{user.email}</strong> 
                  {user.isAdmin && <span className="text-green-600 ml-2">(Already Admin)</span>}
                  {!user.isAdmin && <span className="text-orange-600 ml-2">(Not Admin)</span>}
                </span>
              )}
            </p>
          </div>

          <div className="mb-6">
            <button
              onClick={handleMakeAdmin}
              disabled={loading || !user || user.isAdmin}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed mr-4"
            >
              {loading ? 'Setting up...' : 'Make Me Admin'}
            </button>
          </div>

          <div className="mt-8 p-4 bg-purple-100 rounded-lg">
            <h3 className="font-semibold mb-2 text-purple-900">Admin Instructions:</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Click "Make Me Admin" to grant yourself admin access</li>
              <li>• Once you're an admin, you can manage other users via the Users page</li>
              <li>• Admins can create, edit, and delete blog posts</li>
              <li>• Admins can access all admin dashboard features</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default function AdminSeedPage() {
  return (
    <AuthProvider>
      <AdminRouteGuard>
        <AdminSeedPageContent />
      </AdminRouteGuard>
    </AuthProvider>
  )
}