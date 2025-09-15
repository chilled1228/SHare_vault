'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/types/blog'
import { BlogService } from '@/lib/blog-service'
import AdminLayout from '@/components/admin/AdminLayout'
import { AuthProvider } from '@/lib/auth-context'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import { authService } from '@/lib/auth-service'
import MediaUpload from '@/components/admin/MediaUpload'
import { Save, Eye, X, Upload, FileText, Globe } from 'lucide-react'

interface PostFormData {
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: string
  authorName: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
  imageUrl: string
  readTime: number
}

interface UploadedFile {
  url: string
  key: string
  name: string
  type: string
}

interface AdminUser {
  id: string
  email: string
  displayName: string
  isAdmin: boolean
}

function CreatePostPageContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [loadingAdmins, setLoadingAdmins] = useState(true)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [slugValidation, setSlugValidation] = useState<{ isValid: boolean; message: string }>({ isValid: true, message: '' })
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false)
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    authorId: '',
    authorName: '',
    category: '',
    tags: [],
    featured: false,
    published: false,
    imageUrl: '',
    readTime: 0
  })
  const [tagInput, setTagInput] = useState('')
  const [error, setError] = useState('')

  // Fetch admin users on component mount
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        setLoadingAdmins(true)
        const allUsers = await authService.getAllUsers()
        const admins = allUsers.filter(user => user.isAdmin)
        setAdminUsers(admins)
      } catch (error) {
        console.error('Error fetching admin users:', error)
        setError('Failed to load admin users')
      } finally {
        setLoadingAdmins(false)
      }
    }

    fetchAdminUsers()
  }, [])

  const categories = [
    'Motivation',
    'Wisdom',
    'Love & Relationships',
    'Humor',
    'Daily Inspiration',
    'Success',
    'Life Lessons',
    'Philosophy'
  ]

  const sanitizeSlug = (slug: string) => {
    return slug
      .toLowerCase()
      // Remove invisible Unicode characters (like zero-width space)
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      // Remove special characters but keep alphanumeric, spaces, and hyphens
      .replace(/[^\w\s-]/g, '')
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ')
      // Trim whitespace from start and end
      .trim()
      // Replace spaces with hyphens
      .replace(/\s/g, '-')
      // Replace multiple consecutive hyphens with single hyphen
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
  }

  const generateSlug = (title: string) => {
    return sanitizeSlug(title)
  }

  const validateSlug = (slug: string) => {
    if (!slug) return { isValid: false, message: 'Slug is required' }
    if (slug.length < 3) return { isValid: false, message: 'Slug must be at least 3 characters long' }
    if (slug.length > 100) return { isValid: false, message: 'Slug must be less than 100 characters' }
    if (!/^[a-z0-9-]+$/.test(slug)) return { isValid: false, message: 'Slug can only contain lowercase letters, numbers, and hyphens' }
    if (slug.startsWith('-') || slug.endsWith('-')) return { isValid: false, message: 'Slug cannot start or end with a hyphen' }
    if (slug.includes('--')) return { isValid: false, message: 'Slug cannot contain consecutive hyphens' }
    return { isValid: true, message: '' }
  }

  const handleInputChange = (field: keyof PostFormData, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      
      // Handle title changes
      if (field === 'title') {
        // Only auto-generate slug if it hasn't been manually edited
        if (!isSlugManuallyEdited && (!prev.slug || prev.slug === generateSlug(prev.title))) {
          updated.slug = generateSlug(value)
          // Validate the generated slug
          const validation = validateSlug(updated.slug)
          setSlugValidation(validation)
        }
      }
      
      // Handle slug changes
      if (field === 'slug') {
        // Mark slug as manually edited if user types in it
        if (value !== generateSlug(prev.title)) {
          setIsSlugManuallyEdited(true)
        }
        
        // Sanitize and validate the slug
        const sanitizedSlug = sanitizeSlug(value)
        updated.slug = sanitizedSlug
        const validation = validateSlug(sanitizedSlug)
        setSlugValidation(validation)
      }
      
      // Calculate read time based on content
      if (field === 'content') {
        const wordsPerMinute = 200
        const wordCount = value.trim().split(/\s+/).length
        updated.readTime = Math.ceil(wordCount / wordsPerMinute)
      }
      
      return updated
    })
  }

  const handleAuthorSelect = (authorId: string) => {
    const selectedAdmin = adminUsers.find(admin => admin.id === authorId)
    if (selectedAdmin) {
      setFormData(prev => ({
        ...prev,
        authorId: selectedAdmin.id,
        authorName: selectedAdmin.displayName || selectedAdmin.email
      }))
    }
  }

  const handleMediaUpload = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...files])
    
    // If it's an image and no featured image is set, use the first image as featured
    const firstImage = files.find(file => file.type.startsWith('image/'))
    if (firstImage && !formData.imageUrl) {
      setFormData(prev => ({
        ...prev,
        imageUrl: firstImage.url
      }))
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent, publishStatus?: boolean) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (!formData.title || !formData.content || !formData.authorId || !formData.authorName) {
      setError('Please fill in all required fields including selecting an author')
      return
    }

    if (!formData.slug) {
      setError('Please provide a slug for the post')
      return
    }

    // Validate slug
    const slugValidationResult = validateSlug(formData.slug)
    if (!slugValidationResult.isValid) {
      setError(`Slug error: ${slugValidationResult.message}`)
      return
    }

    setLoading(true)

    try {
      // Check slug uniqueness
      const isUnique = await BlogService.isSlugUnique(formData.slug)
      if (!isUnique) {
        setError('This slug already exists. Please choose a different slug.')
        setLoading(false)
        return
      }
      // Override published status if provided
      const postData = publishStatus !== undefined 
        ? { ...formData, published: publishStatus }
        : formData

      const postId = await BlogService.createPost(postData)
      const status = postData.published ? 'published' : 'draft'
      router.push(`/admin/posts?created=${postId}&status=${status}`)
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Failed to create post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDraft = (e: React.FormEvent) => {
    handleSubmit(e, false)
  }

  const handlePublish = (e: React.FormEvent) => {
    handleSubmit(e, true)
  }

  const handlePreview = () => {
    // Save form data to localStorage for preview
    localStorage.setItem('previewPost', JSON.stringify(formData))
    window.open('/admin/preview', '_blank')
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600 mt-1">Create a new blog post</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                    URL Slug *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const newSlug = generateSlug(formData.title)
                      handleInputChange('slug', newSlug)
                      setIsSlugManuallyEdited(false)
                    }}
                    className="text-xs text-blue-600 hover:text-blue-500"
                  >
                    Generate from title
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className={`w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 ${
                      slugValidation.isValid ? 'border-gray-300' : 'border-red-300'
                    }`}
                    placeholder="url-friendly-slug"
                    required
                  />
                  {formData.slug && (
                    <div className="absolute right-2 top-2">
                      {slugValidation.isValid ? (
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {formData.slug && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-500">
                      Preview: <span className="font-mono">/{formData.slug}</span>
                    </p>
                    {!slugValidation.isValid && (
                      <p className="text-xs text-red-600 mt-1">{slugValidation.message}</p>
                    )}
                    {slugValidation.isValid && isSlugManuallyEdited && (
                      <p className="text-xs text-blue-600 mt-1">Custom slug - won't auto-update from title</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="authorSelect" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Author *
                </label>
                {loadingAdmins ? (
                  <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-500">
                    Loading admins...
                  </div>
                ) : (
                  <select
                    id="authorSelect"
                    value={formData.authorId}
                    onChange={(e) => handleAuthorSelect(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select an admin author</option>
                    {adminUsers.map((admin) => (
                      <option key={admin.id} value={admin.id}>
                        {admin.displayName || admin.email}
                      </option>
                    ))}
                  </select>
                )}
                {formData.authorName && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {formData.authorName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the post"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={12}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your post content here... (Markdown supported)"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.readTime ? `${formData.readTime} min read` : 'Enter content to calculate read time'}
                </p>
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Media Upload
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Upload images, videos, or documents for your post. Files will be saved in the ShareVault folder.
                </p>
              </div>
              <MediaUpload 
                onUpload={handleMediaUpload}
                multiple={true}
                maxFiles={10}
              />
            </div>

            {/* Post Options */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Post Options</h3>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured post</span>
                </label>
              </div>
            </div>

            {/* Publication Status */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Publication Status</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="draft"
                      name="publishStatus"
                      checked={!formData.published}
                      onChange={() => handleInputChange('published', false)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="draft" className="ml-2 flex items-center text-sm text-gray-700">
                      <FileText className="w-4 h-4 mr-1" />
                      Save as Draft
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="published"
                      name="publishStatus"
                      checked={formData.published}
                      onChange={() => handleInputChange('published', true)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="published" className="ml-2 flex items-center text-sm text-gray-700">
                      <Globe className="w-4 h-4 mr-1" />
                      Publish Now
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {formData.published 
                    ? 'This post will be publicly visible immediately after creation.'
                    : 'This post will be saved as a draft and won\'t be publicly visible until published.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handlePreview}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Save Draft
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handlePublish}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>Publishing...</>
                ) : (
                  <>
                    <Globe className="w-4 h-4 mr-2" />
                    Publish Now
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}


export default function CreatePostPage() {
  return <CreatePostPageContent />
}
