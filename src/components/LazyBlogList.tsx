'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { BlogPost } from '@/types/blog'
import { BlogService } from '@/lib/blog-service'
import BlogPostCard from './BlogPostCard'

interface LazyBlogListProps {
  category?: string
  limit?: number
  featured?: boolean
}

export default function LazyBlogList({ category, limit, featured = false }: LazyBlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(12)

  const fetchPosts = useCallback(async () => {
    try {
      let fetchedPosts: BlogPost[]
      
      if (featured) {
        fetchedPosts = await BlogService.getFeaturedPosts(limit)
      } else if (category) {
        fetchedPosts = await BlogService.getPostsByCategory(category, limit)
      } else {
        fetchedPosts = await BlogService.getPosts()
      }
      
      setPosts(fetchedPosts)
      console.log(`✅ [LazyBlogList] Loaded ${fetchedPosts.length} posts`, {
        component: 'LazyBlogList',
        category,
        limit,
        featured,
        metadata: {
          totalPosts: fetchedPosts.length
        }
      })
    } catch (err) {
      setError('Failed to load posts')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }, [category, limit, featured])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const displayedPosts = useMemo(() => 
    posts.slice(0, displayCount), 
    [posts, displayCount]
  )

  const handleLoadMore = useCallback(() => {
    setDisplayCount(prev => Math.min(prev + 12, posts.length))
  }, [posts.length])

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="rounded-lg h-96 animate-pulse"
                style={{backgroundColor: 'var(--muted)'}}
                aria-label="Loading post..."
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center" style={{color: 'var(--destructive)'}}>
            <p>{error}</p>
            <button 
              onClick={fetchPosts}
              className="mt-4 btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center" style={{color: 'var(--muted-foreground)'}}>
            <p className="text-xl">No posts found.</p>
            {category && (
              <p className="mt-2">Try browsing other categories or check back later.</p>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {!featured && !category && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: 'var(--primary)'}}>
              ✨ Latest Stories
            </h2>
            <p className="text-xl" style={{color: 'var(--muted-foreground)'}}>
              Discover inspiration, wisdom, and motivation
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <BlogPostCard 
              key={post.id} 
              post={post} 
              priority={index < 3} // Prioritize first 3 images
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ))}
        </div>

        {displayCount < posts.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="btn btn-primary px-8 py-3 text-lg"
              aria-label={`Load ${Math.min(12, posts.length - displayCount)} more posts`}
            >
              Load More Stories ({posts.length - displayCount} remaining)
            </button>
          </div>
        )}

        {displayCount >= posts.length && posts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-lg" style={{color: 'var(--muted-foreground)'}}>
              🎉 You&apos;ve seen all our latest stories! 
            </p>
            <p className="mt-2" style={{color: 'var(--muted-foreground)'}}>
              Check back soon for fresh inspiration.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}