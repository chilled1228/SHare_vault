'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BlogPost } from '@/types/blog'
import { BlogService } from '@/lib/blog-service'
import AdminLayout from '@/components/admin/AdminLayout'
import { AuthProvider } from '@/lib/auth-context'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import { Edit, Trash2, Eye, Plus, Search, Filter, Upload, CheckSquare, Square } from 'lucide-react'
import { errorHandler } from '@/lib/error-handler'

function PostsManagementPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const createdId = searchParams.get('created')
  const updatedId = searchParams.get('updated')
  const createdStatus = searchParams.get('status')
  
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; post?: BlogPost }>({ open: false })
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set())
  const [bulkDeleteModal, setBulkDeleteModal] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, filterStatus])

  const fetchPosts = async () => {
    try {
      const allPosts = await BlogService.getAllPosts()
      setPosts(allPosts)
    } catch (error) {
      errorHandler.error('Error fetching posts', error as Error, {
        component: 'PostsManagementPage',
        action: 'fetchPosts'
      })
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
      errorHandler.error('Error deleting post', error as Error, {
        component: 'PostsManagementPage',
        action: 'deletePost',
        metadata: { postId: deleteModal.post.id }
      })
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
      errorHandler.error('Error toggling publish status', error as Error, {
        component: 'PostsManagementPage',
        action: 'togglePublish',
        metadata: { postId: post.id }
      })
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
      errorHandler.error('Error toggling featured status', error as Error, {
        component: 'PostsManagementPage',
        action: 'toggleFeatured',
        metadata: { postId: post.id }
      })
    }
  }

  const toggleSelectPost = (postId: string) => {
    const newSelected = new Set(selectedPosts)
    if (newSelected.has(postId)) {
      newSelected.delete(postId)
    } else {
      newSelected.add(postId)
    }
    setSelectedPosts(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedPosts.size === filteredPosts.length) {
      setSelectedPosts(new Set())
    } else {
      setSelectedPosts(new Set(filteredPosts.map(post => post.id!)))
    }
  }

  const handleBulkDelete = async () => {
    try {
      const postIds = Array.from(selectedPosts)
      await BlogService.bulkDeletePosts(postIds)
      setPosts(posts.filter(post => !selectedPosts.has(post.id!)))
      setSelectedPosts(new Set())
      setBulkDeleteModal(false)
    } catch (error) {
      errorHandler.error('Error bulk deleting posts', error as Error, {
        component: 'PostsManagementPage',
        action: 'bulkDelete',
        metadata: { postIds: Array.from(selectedPosts) }
      })
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
        {(createdId || updatedId) && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-sm text-green-800">
              {createdId && `Post ${createdStatus === 'draft' ? 'saved as draft' : 'published'} successfully!`}
              {updatedId && `Post ${createdStatus === 'draft' ? 'updated and saved as draft' : 'updated and published'} successfully!`}
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Posts Management</h1>
            <p className="text-gray-600 mt-1">Manage your blog posts</p>
          </div>
          <div className="flex space-x-3">
            {selectedPosts.size > 0 && (
              <button
                onClick={() => setBulkDeleteModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedPosts.size})
              </button>
            )}
            <a
              href="/admin/posts/bulk-upload"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </a>
            <a
              href="/admin/posts/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Post
            </a>
          </div>
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
                    <button
                      onClick={toggleSelectAll}
                      className="flex items-center hover:text-gray-700"
                    >
                      {selectedPosts.size === filteredPosts.length && filteredPosts.length > 0 ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                      <span className="ml-2">Select</span>
                    </button>
                  </th>
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
                        <button
                          onClick={() => toggleSelectPost(post.id!)}
                          className="flex items-center justify-center p-1 hover:bg-gray-100 rounded"
                        >
                          {selectedPosts.has(post.id!) ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </td>
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
                          <button
                            onClick={() => router.push(`/admin/posts/edit/${post.id}`)}
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                            title="Edit post"
                          >
                            <Edit size={16} />
                          </button>
                          <a
                            href={`/${post.slug}`}
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
                    <td colSpan={7} className="px-6 py-12 text-center">
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

      {/* Bulk Delete Confirmation Modal */}
      {bulkDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Delete Selected Posts
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete {selectedPosts.size} selected post{selectedPosts.size !== 1 ? 's' : ''}? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setBulkDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete {selectedPosts.size} Post{selectedPosts.size !== 1 ? 's' : ''}
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
  return <PostsManagementPageContent />
}
