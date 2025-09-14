'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'
import { BlogService } from '@/lib/blog-service'

interface RelatedPostsProps {
  currentPost: BlogPost
  limit?: number
}

export default function RelatedPosts({ currentPost, limit = 3 }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedPosts() {
      try {
        // Get posts from the same category or with similar tags
        const allPosts = await BlogService.getPosts(50)
        
        // Filter out current post and find related ones
        const filtered = allPosts
          .filter(post => post.id !== currentPost.id)
          .filter(post => 
            post.category === currentPost.category || 
            post.tags.some(tag => currentPost.tags.includes(tag))
          )
          .slice(0, limit)
        
        setRelatedPosts(filtered)
      } catch (error) {
        console.error('Error fetching related posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [currentPost, limit])

  if (loading) {
    return (
      <div className="animate-pulse">
        <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--primary)'}}>
          Related Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({length: limit}).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedPosts.length === 0) {
    return null
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{color: 'var(--primary)'}}>
        ✨ Related Stories You'll Love
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.slug}`}>
              <div 
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1"
                style={{backgroundColor: 'var(--card)', border: '1px solid var(--border)'}}
              >
                {post.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: 'var(--accent-pink-soft)',
                        color: 'var(--primary)'
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs" style={{color: 'var(--muted-foreground)'}}>
                      {post.readTime} min
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-opacity-80 transition-colors" style={{color: 'var(--foreground)'}}>
                    {post.title}
                  </h3>
                  
                  <p className="text-sm mb-3 line-clamp-2" style={{color: 'var(--muted-foreground)'}}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs" style={{color: 'var(--muted-foreground)'}}>
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="font-medium" style={{color: 'var(--primary)'}}>
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}