export interface BlogPost {
  id?: string
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
  createdAt: Date
  updatedAt: Date
  imageUrl?: string
  readTime: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  postCount: number
}

export interface MediaFile {
  id: string
  name: string
  url: string
  type: string
  size: number
  path: string
  uploadedBy: string
  uploadedAt: Date
}