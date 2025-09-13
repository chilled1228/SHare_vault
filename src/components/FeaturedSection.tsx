'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'
import { BlogService } from '@/lib/blog-service'

export default function FeaturedSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      let postsLength = 0
      try {
        console.log('FeaturedSection: Starting to fetch featured posts...')
        const fetchedPosts = await BlogService.getFeaturedPosts()
        postsLength = fetchedPosts.length
        console.log('FeaturedSection: Fetched posts:', postsLength, fetchedPosts)
        setPosts(fetchedPosts)
      } catch (err) {
        console.error('FeaturedSection: Error fetching featured posts:', err)
      } finally {
        console.log('FeaturedSection: Setting loading to false, posts length:', postsLength)
        setLoading(false)
      }
    }

    fetchFeaturedPosts()
  }, [])

  console.log('FeaturedSection render: loading =', loading, 'posts.length =', posts.length)
  
  if (loading) {
    console.log('FeaturedSection: Rendering loading state')
    return (
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg w-full max-w-6xl mx-auto overflow-hidden animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[450px]">
              <div className="p-6 md:p-8 flex flex-col justify-center space-y-4">
                <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
                <div className="h-8 w-full bg-gray-300 rounded"></div>
                <div className="h-6 w-48 bg-gray-300 rounded"></div>
              </div>
              <div className="bg-gray-300 min-h-[210px] md:min-h-full"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    console.log('FeaturedSection: Rendering no posts state')
    return (
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg w-full max-w-6xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[450px]">
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="text-center text-gray-600">
                  No featured posts available yet.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const currentSlide = posts[activeSlide]
  console.log('FeaturedSection: Rendering main content, currentSlide:', currentSlide?.title)

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-6xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[450px]">
            <div className="p-6 md:p-8 flex flex-col justify-center relative">
              <div className="space-y-4">
                <div className="inline-block">
                  <span 
                    className="text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    {currentSlide.category}
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
                  {currentSlide.title}
                </h1>
                <div className="flex items-center text-sm" style={{ color: 'var(--foreground-muted)' }}>
                  <p className="font-semibold" style={{ color: 'var(--foreground)' }}>{currentSlide.authorName}</p>
                  <span className="mx-2">•</span>
                  <p>{new Date(currentSlide.createdAt).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <p className="text-gray-600 mt-4">
                  {currentSlide.excerpt}
                </p>
                {currentSlide.readTime && (
                  <div className="text-sm text-gray-500">
                    {currentSlide.readTime} min read
                  </div>
                )}
              </div>
              
              {/* Indicators */}
              {posts.length > 1 && (
                <div className="flex items-center space-x-2 absolute bottom-6 left-6 md:left-8 z-20">
                  {posts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`relative transition-all duration-300 ${
                        activeSlide === index 
                          ? 'w-8 h-3 rounded-full scale-110 border' 
                          : 'w-3 h-3 rounded-full hover:scale-105 border'
                      }`}
                      style={{
                        backgroundColor: activeSlide === index ? 'var(--primary)' : '#e2e8f0',
                        borderColor: activeSlide === index ? 'var(--primary-text)' : '#cbd5e1'
                      }}
                    >
                      {activeSlide === index && (
                        <div 
                          className="absolute inset-0 rounded-full animate-pulse opacity-50"
                          style={{ backgroundColor: 'var(--primary)' }}
                        ></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative min-h-[210px] md:min-h-full p-3">
              <div className="relative w-full h-full overflow-hidden rounded-r-xl">
                {currentSlide.imageUrl ? (
                  <Image
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={true}
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--muted)' }}
                  >
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:from-transparent md:via-transparent md:to-transparent md:bg-gradient-to-r md:from-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}