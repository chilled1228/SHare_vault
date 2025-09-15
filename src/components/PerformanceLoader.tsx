'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { BlogPost } from '@/types/blog'

// Lazy load components to improve initial bundle size
const LazyBlogList = dynamic(() => import('./LazyBlogList'), {
  loading: () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="rounded-lg h-96 animate-pulse"
              style={{backgroundColor: 'var(--muted)'}}
              aria-label="Loading content..."
            />
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: false, // Only render on client side after initial load
})

// Lazy load Header for better performance
const LazyHeader = dynamic(() => import('./Header'), {
  loading: () => (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center">Loading header...</div>
      </div>
    </header>
  ),
  ssr: false,
})

// Lazy load Featured Section
const LazyFeaturedSection = dynamic(() => import('./FeaturedSection'), {
  loading: () => (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white border rounded-2xl shadow-lg w-full max-w-6xl mx-auto overflow-hidden h-[450px] animate-pulse"></div>
      </div>
    </section>
  ),
  ssr: false,
})

const LazyRelatedPosts = dynamic(() => import('./RelatedPosts'), {
  loading: () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4 w-64 mx-auto"></div>
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({length: 3}).map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
        ))}
      </div>
    </div>
  ),
  ssr: false,
})

// Web Vitals monitoring (only in production)
const WebVitals = dynamic(() => import('./WebVitals'), {
  ssr: false,
})

interface RelatedPostsProps {
  currentPost: BlogPost
  limit?: number
}

interface PerformanceLoaderProps {
  children?: React.ReactNode
  showBlogList?: boolean
  showRelatedPosts?: boolean
  relatedPostsProps?: RelatedPostsProps
}

export default function PerformanceLoader({ 
  children, 
  showBlogList = false, 
  showRelatedPosts = false,
  relatedPostsProps 
}: PerformanceLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Use Intersection Observer to load content when it comes into view
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
              observer.disconnect()
            }
          })
        },
        { 
          rootMargin: '200px', // Start loading 200px before element comes into view
          threshold: 0.1 
        }
      )

      const element = document.getElementById('performance-loader')
      if (element) {
        observer.observe(element)
      }

      return () => observer.disconnect()
    } else {
      // Fallback for browsers without Intersection Observer
      setIsVisible(true)
    }
  }, [])

  return (
    <>
      <div id="performance-loader">
        {children}
        
        {showBlogList && isVisible && <LazyBlogList />}
        
        {showRelatedPosts && isVisible && relatedPostsProps && (
          <LazyRelatedPosts {...relatedPostsProps} />
        )}
      </div>
      
      {/* Only load WebVitals in production */}
      {process.env.NODE_ENV === 'production' && <WebVitals />}
    </>
  )
}

// Export individual lazy components for direct use
export { LazyBlogList, LazyRelatedPosts, LazyHeader, LazyFeaturedSection }