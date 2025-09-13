'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BlogPost } from '@/types/blog'
import { BlogService } from '@/lib/blog-service'
import AdminLayout from '@/components/admin/AdminLayout'
import { AuthProvider } from '@/lib/auth-context'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import { Edit, Trash2, Eye, Plus, Search, Filter } from 'lucide-react'

function PostsManagementPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const createdId = searchParams.get('created')
  
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; post?: BlogPost }>({ open: false })

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, filterStatus])

  const fetchPosts = async () => {
    try {
      const allPosts = await BlogService.getAllPosts(100)
      setPosts(allPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    // Filter by status
    if (filterStatus === 'published') {
      filtered = filtered.filter(post => post.published)
    } else if (filterStatus === 'draft') {
      filtered = filtered.filter(post => !post.published)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredPosts(filtered)
  }

  const handleDelete = async () => {
    if (!deleteModal.post?.id) return

    try {
      await BlogService.deletePost(deleteModal.post.id)
      setPosts(posts.filter(post => post.id !== deleteModal.post!.id))
      setDeleteModal({ open: false, post: undefined })
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const togglePublish = async (post: BlogPost) => {
    if (!post.id) return
    
    try {
      await BlogService.updatePost(post.id, { published: !post.published })
      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, published: !p.published } : p
      ))
    } catch (error) {
      console.error('Error toggling publish status:', error)
    }
  }

  const toggleFeatured = async (post: BlogPost) => {
    if (!post.id) return
    
    try {
      await BlogService.updatePost(post.id, { featured: !post.featured })
      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, featured: !p.featured } : p
      ))
    } catch (error) {
      console.error('Error toggling featured status:', error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading posts...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Success message */}
        {createdId && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-sm text-green-800">Post created successfully!</p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Posts Management</h1>
            <p className="text-gray-600 mt-1">Manage your blog posts</p>
          </div>
          <a
            href="/admin/posts/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create New Post
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Posts</p>
            <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <p className="text-sm text-gray-600">Published</p>
            <p className="text-2xl font-bold text-green-600">
              {posts.filter(p => p.published).length}
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <p className="text-sm text-gray-600">Drafts</p>
            <p className="text-2xl font-bold text-gray-600">
              {posts.filter(p => !p.published).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Posts</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {post.title}
                        </div>
                        {post.featured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{post.authorName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{post.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(post)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.published 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleFeatured(post)}
                            className={`p-1 rounded ${
                              post.featured ? 'text-yellow-600 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'
                            }`}
                            title={post.featured ? 'Remove from featured' : 'Mark as featured'}
                          >
                            <Filter size={16} />
                          </button>
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="View post"
                          >
                            <Eye size={16} />
                          </a>
                          <button
                            onClick={() => setDeleteModal({ open: true, post })}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete post"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <p className="text-gray-500">No posts found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && deleteModal.post && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Delete Post
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete "{deleteModal.post.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteModal({ open: false, post: undefined })}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </AdminLayout>
  )
}

export default function PostsManagementPage() {
  return (
    <AuthProvider>
      <AdminRouteGuard>
        <PostsManagementPageContent />
      </AdminRouteGuard>
    </AuthProvider>
  )
}