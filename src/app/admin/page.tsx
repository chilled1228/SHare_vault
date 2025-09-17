'use client'



import { useEffect, useState } from 'react'
import { BlogPost } from '@/types/blog'
import { BlogService } from '@/lib/blog-service'
import AdminLayout from '@/components/admin/AdminLayout'
import { AuthProvider } from '@/lib/auth-context'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'

function AdminDashboardContent() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    featuredPosts: 0,
    recentPosts: [] as BlogPost[]
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [allPosts, featuredPosts] = await Promise.all([
          BlogService.getPosts(50),
          BlogService.getFeaturedPosts()
        ])

        const publishedPosts = allPosts.filter(post => post.published)
        const recentPosts = allPosts.slice(0, 5)

        setStats({
          totalPosts: allPosts.length,
          publishedPosts: publishedPosts.length,
          featuredPosts: featuredPosts.length,
          recentPosts
        })
      } catch (error) {
        console.error('Error fetching admin stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    { title: 'Total Posts', value: stats.totalPosts, color: 'bg-blue-500' },
    { title: 'Published Posts', value: stats.publishedPosts, color: 'bg-green-500' },
    { title: 'Featured Posts', value: stats.featuredPosts, color: 'bg-yellow-500' },
    { title: 'Draft Posts', value: stats.totalPosts - stats.publishedPosts, color: 'bg-gray-500' },
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your blog content</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <div key={stat.title} className="bg-white border rounded-lg p-4">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/posts/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create New Post
            </a>
            <a
              href="/admin/posts"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Manage All Posts
            </a>
            <a
              href="/admin/seed"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Database Tools
            </a>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white border rounded-lg">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Recent Posts</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {stats.recentPosts.length > 0 ? (
              stats.recentPosts.map((post) => (
                <div key={post.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                      {post.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">No posts found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}


export default function AdminDashboard() {
  return <AdminDashboardContent />
}