import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LazyBlogList } from '@/components/PerformanceLoader'
import { getCanonicalUrl, getCategoryUrl, getImageUrl } from '@/lib/seo-utils'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

const CATEGORIES = {
  'motivation': {
    name: 'Motivation',
    description: 'Inspiring quotes and stories to fuel your drive and ambition',
    color: '#ff3494'
  },
  'life-wisdom': {
    name: 'Life Wisdom',
    description: 'Profound insights and timeless wisdom for meaningful living',
    color: '#2563eb'
  },
  'personal-growth': {
    name: 'Personal Growth',
    description: 'Stories and quotes to help you become your best self',
    color: '#059669'
  },
  'inspiration': {
    name: 'Inspiration',
    description: 'Uplifting content to brighten your day and spark creativity',
    color: '#7c3aed'
  }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = CATEGORIES[slug as keyof typeof CATEGORIES]
  
  if (!category) {
    return {
      title: 'Category Not Found - Shair Vault',
      description: 'The requested category could not be found.'
    }
  }

  return {
    title: `${category.name} Stories & Quotes | Shair Vault`,
    description: `Discover ${category.name.toLowerCase()} stories, quotes, and insights. ${category.description}`,
    keywords: [category.name.toLowerCase(), 'quotes', 'stories', 'inspiration', 'wisdom'],
    openGraph: {
      title: `${category.name} Stories & Quotes | Shair Vault`,
      description: category.description,
      type: 'website',
      url: getCategoryUrl(slug),
      images: [
        {
          url: getImageUrl(`og-${slug}.jpg`),
          width: 1200,
          height: 630,
          alt: `${category.name} - Shair Vault`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} Stories & Quotes | Shair Vault`,
      description: category.description,
      images: [getImageUrl(`og-${slug}.jpg`)],
    },
    alternates: {
      canonical: getCategoryUrl(slug),
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = CATEGORIES[slug as keyof typeof CATEGORIES]
  
  if (!category) {
    notFound()
  }

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": getCategoryUrl(slug)
      }
    ]
  }

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Stories & Quotes`,
    "description": category.description,
    "url": getCategoryUrl(slug),
    "mainEntity": {
      "@type": "ItemList",
      "name": `${category.name} Articles`,
      "description": category.description
    },
    "breadcrumb": breadcrumbSchema
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      
      <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
        <Header />
        
        <main className="flex-1">
          {/* Category Header */}
          <div className="py-16" style={{ backgroundColor: `${category.color}10` }}>
            <div className="container mx-auto px-4 text-center">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                style={{ color: category.color }}
              >
                {category.name}
              </h1>
              <p 
                className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                style={{ color: 'var(--foreground-muted)' }}
              >
                {category.description}
              </p>
              
              {/* Category Badge */}
              <div className="mt-8">
                <span 
                  className="inline-block px-6 py-2 rounded-full text-white font-medium"
                  style={{ backgroundColor: category.color }}
                >
                  Browse {category.name} Stories
                </span>
              </div>
            </div>
          </div>

          {/* Category Posts */}
          <div className="py-12">
            <LazyBlogList category={slug} limit={20} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}