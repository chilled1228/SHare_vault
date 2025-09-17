import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getCanonicalUrl } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'All Categories | ShareVault',
  description: 'Explore inspiring content categories like motivation, life wisdom, and personal growth. Find the perfect stories and quotes for your journey.',
  keywords: ['categories', 'motivation', 'life wisdom', 'personal growth', 'inspiration', 'quotes', 'stories'],
  openGraph: {
    title: 'All Categories | ShareVault',
    description: 'Explore inspiring content categories like motivation, life wisdom, and personal growth. Find the perfect stories and quotes for your journey.',
    type: 'website',
    url: getCanonicalUrl('categories'),
    images: [
      {
        url: getCanonicalUrl('og-categories.jpg'),
        width: 1200,
        height: 630,
        alt: 'All Categories - ShareVault',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Categories | ShareVault',
    description: 'Explore inspiring content categories like motivation, life wisdom, and personal growth. Find the perfect stories and quotes for your journey.',
    images: [getCanonicalUrl('og-categories.jpg')],
  },
  alternates: {
    canonical: getCanonicalUrl('categories'),
    languages: {
      'en-US': getCanonicalUrl('categories'),
      'x-default': getCanonicalUrl('categories'),
    },
  },
}

const CATEGORIES = [
  {
    slug: 'motivation',
    name: 'Motivation',
    description: 'Inspiring quotes and stories to fuel your drive and ambition',
    color: '#ff3494',
    icon: '🚀'
  },
  {
    slug: 'life-wisdom',
    name: 'Life Wisdom',
    description: 'Profound insights and timeless wisdom for meaningful living',
    color: '#2563eb',
    icon: '🧠'
  },
  {
    slug: 'personal-growth',
    name: 'Personal Growth',
    description: 'Stories and quotes to help you become your best self',
    color: '#059669',
    icon: '🌱'
  },
  {
    slug: 'inspiration',
    name: 'Inspiration',
    description: 'Uplifting content to brighten your day and spark creativity',
    color: '#7c3aed',
    icon: '✨'
  }
]

export default function CategoriesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getCanonicalUrl()
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Categories",
        "item": getCanonicalUrl('categories')
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
        <Header />
        
        <main className="flex-1">
          {/* Page Header */}
          <div className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{color: 'var(--primary)'}}>
                Explore Categories
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{color: 'var(--muted-foreground)'}}>
                Discover inspiring stories, quotes, and wisdom organized by theme. Find the perfect content for your journey.
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group block"
                  >
                    <div 
                      className="h-full p-8 rounded-2xl transition-all duration-300 hover:shadow-xl"
                      style={{ 
                        backgroundColor: `${category.color}10`,
                        border: `2px solid ${category.color}20`
                      }}
                    >
                      <div className="text-center">
                        <div 
                          className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110"
                        >
                          {category.icon}
                        </div>
                        <h3 
                          className="text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-white"
                          style={{ color: category.color }}
                        >
                          {category.name}
                        </h3>
                        <p className="text-base leading-relaxed mb-6" style={{color: 'var(--muted-foreground)'}}>
                          {category.description}
                        </p>
                        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group-hover:text-white group-hover:bg-opacity-100"
                             style={{ 
                               backgroundColor: `${category.color}20`,
                               color: category.color
                             }}
                        >
                          Browse Stories
                          <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: 'var(--primary)'}}>
                Ready to Get Inspired?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto" style={{color: 'var(--muted-foreground)'}}>
                Join thousands of readers who start their day with wisdom and motivation from ShareVault.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/blog"
                  className="btn btn-primary px-8 py-3 text-lg"
                >
                  Browse All Stories
                </Link>
                <Link
                  href="/"
                  className="btn btn-secondary px-8 py-3 text-lg"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}