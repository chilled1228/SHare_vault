import { Metadata } from 'next'
import Header from '@/components/Header'
import FeaturedSection from '@/components/FeaturedSection'
import BlogList from '@/components/BlogList'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Inspiring Stories, Life Wisdom & Personal Growth',
  description: 'Discover inspiring stories, life wisdom, and personal growth insights. Read thought-provoking articles on motivation, self-improvement, mindfulness, and life philosophy.',
  keywords: ['inspiring stories', 'life wisdom', 'personal growth', 'motivation', 'self-improvement', 'mindfulness', 'life philosophy', 'inspiration'],
  openGraph: {
    title: 'Shair Vault - Inspiring Stories, Life Wisdom & Personal Growth',
    description: 'Discover inspiring stories, life wisdom, and personal growth insights. Read thought-provoking articles on motivation, self-improvement, mindfulness, and life philosophy.',
    type: 'website',
    url: 'https://shairvault.com',
    images: [
      {
        url: '/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Shair Vault - Your source for inspiring stories and life wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shair Vault - Inspiring Stories, Life Wisdom & Personal Growth',
    description: 'Discover inspiring stories, life wisdom, and personal growth insights.',
    images: ['/og-image-home.jpg'],
  },
  alternates: {
    canonical: 'https://shairvault.com',
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
        "item": "https://shairvault.com"
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
          {/* Featured Posts */}
          <div id="featured">
            <FeaturedSection />
          </div>

          {/* All Blog Posts */}
          <BlogList />
        </main>

        <Footer />
      </div>
    </>
  )
}
