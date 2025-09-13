'use client'

import { useState } from 'react'
import { BlogService } from '@/lib/blog-service'
import { seedDatabase } from '@/lib/seed-data'

export default function AdminSeedPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Database Seeding</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
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

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

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
    </div>
  )
}