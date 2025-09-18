import { Metadata } from 'next'
import { getCanonicalUrl, getImageUrl } from '@/lib/seo-utils'
import { LazyHeader, LazyFeaturedSection, LazyBlogList } from '@/components/PerformanceLoader'
import dynamic from 'next/dynamic'

// Lazy load Footer component to reduce initial bundle size
const LazyFooter = dynamic(() => import('@/components/Footer'), {
  loading: () => (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading footer...</div>
      </div>
    </footer>
  ),
})

export const revalidate = 60 // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Inspiring Stories, Life Wisdom & Personal Growth',
  description: 'Discover inspiring stories, life wisdom, and personal growth insights. Read thought-provoking articles on motivation, self-improvement, mindfulness, and life philosophy.',
  keywords: ['inspiring stories', 'life wisdom', 'personal growth', 'motivation', 'self-improvement', 'mindfulness', 'life philosophy', 'inspiration'],
  openGraph: {
    title: 'ShareVault - Inspiring Stories, Life Wisdom & Personal Growth',
    description: 'Discover inspiring stories, life wisdom, and personal growth insights. Read thought-provoking articles on motivation, self-improvement, mindfulness, and life philosophy.',
    type: 'website',
    url: getCanonicalUrl(),
    images: [
      {
        url: getImageUrl('og-image-home.jpg'),
        width: 1200,
        height: 630,
        alt: 'ShareVault - Your source for inspiring stories and life wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShareVault - Inspiring Stories, Life Wisdom & Personal Growth',
    description: 'Discover inspiring stories, life wisdom, and personal growth insights.',
    images: [getImageUrl('og-image-home.jpg')],
  },
  alternates: {
    canonical: getCanonicalUrl(),
    languages: {
      'en-US': getCanonicalUrl(),
      'x-default': getCanonicalUrl(),
    },
  },
}

export default function Home() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getCanonicalUrl()
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
        <LazyHeader />
        <main className="flex-1">
          {/* Featured Posts */}
          <div id="featured">
            <LazyFeaturedSection />
          </div>

          {/* All Blog Posts - Lazy loaded */}
          <LazyBlogList />
        </main>

        <LazyFooter />
      </div>
    </>
  )
}
