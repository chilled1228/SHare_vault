import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LazyBlogList } from '@/components/PerformanceLoader'
import { BlogService } from '@/lib/blog-service'
import { BlogPost } from '@/types/blog'
import { getCanonicalUrl, getCategoryUrl, getImageUrl } from '@/lib/seo-utils'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

const PREDEFINED_CATEGORIES = {
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

// Helper function to format category name
function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper function to generate a color based on slug
function getCategoryColor(slug: string): string {
  const colors = ['#ff3494', '#2563eb', '#059669', '#7c3aed', '#dc2626', '#ea580c', '#ca8a04', '#65a30d']
  const index = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}

export const revalidate = 60 // Revalidate every 60 seconds

export async function generateStaticParams() {
  return Object.keys(PREDEFINED_CATEGORIES).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = params
  
  // Check if it's a predefined category
  const predefinedCategory = PREDEFINED_CATEGORIES[slug as keyof typeof PREDEFINED_CATEGORIES]
  
  // Check if there are posts for this category
  let categoryPosts: BlogPost[] = []
  try {
    categoryPosts = await BlogService.getPostsByCategory(slug, 1)
  } catch (error) {
    // If there's an error fetching posts, we'll still show the page
    console.error('Error fetching category posts:', error)
  }
  
  // If no predefined category and no posts found, return 404 metadata
  if (!predefinedCategory && categoryPosts.length === 0) {
    return {
      title: 'Category Not Found - Shair Vault',
      description: 'The requested category could not be found.'
    }
  }

  const categoryName = predefinedCategory?.name || formatCategoryName(slug)
  const categoryDescription = predefinedCategory?.description || `Discover ${categoryName.toLowerCase()} stories, quotes, and insights to inspire and motivate you.`
  const categoryColor = predefinedCategory?.color || getCategoryColor(slug)

  return {
    title: `${categoryName} Stories & Quotes | Shair Vault`,
    description: `Discover ${categoryName.toLowerCase()} stories, quotes, and insights. ${categoryDescription}`,
    keywords: [categoryName.toLowerCase(), 'quotes', 'stories', 'inspiration', 'wisdom'],
    openGraph: {
      title: `${categoryName} Stories & Quotes | Shair Vault`,
      description: categoryDescription,
      type: 'website',
      url: getCategoryUrl(slug),
      images: [
        {
          url: getImageUrl(`og-${slug}.jpg`),
          width: 1200,
          height: 630,
          alt: `${categoryName} - Shair Vault`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} Stories & Quotes | Shair Vault`,
      description: categoryDescription,
      images: [getImageUrl(`og-${slug}.jpg`)],
    },
    alternates: {
      canonical: getCategoryUrl(slug),
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  
  // Check if it's a predefined category
  const predefinedCategory = PREDEFINED_CATEGORIES[slug as keyof typeof PREDEFINED_CATEGORIES]
  
  // Check if there are posts for this category
  let categoryPosts: BlogPost[] = []
  try {
    categoryPosts = await BlogService.getPostsByCategory(slug, 1)
  } catch (error) {
    console.error('Error fetching category posts:', error)
  }
  
  // If no predefined category and no posts found, return 404
  if (!predefinedCategory && categoryPosts.length === 0) {
    notFound()
  }

  const categoryName = predefinedCategory?.name || formatCategoryName(slug)
  const categoryDescription = predefinedCategory?.description || `Discover ${categoryName.toLowerCase()} stories, quotes, and insights to inspire and motivate you.`
  const categoryColor = predefinedCategory?.color || getCategoryColor(slug)

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
        "name": categoryName,
        "item": getCategoryUrl(slug)
      }
    ]
  }

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} Stories & Quotes`,
    "description": categoryDescription,
    "url": getCategoryUrl(slug),
    "mainEntity": {
      "@type": "ItemList",
      "name": `${categoryName} Articles`,
      "description": categoryDescription
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
          <div className="py-16" style={{ backgroundColor: `${categoryColor}10` }}>
            <div className="container mx-auto px-4 text-center">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                style={{ color: categoryColor }}
              >
                {categoryName}
              </h1>
              <p 
                className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                style={{ color: 'var(--foreground-muted)' }}
              >
                {categoryDescription}
              </p>
              
              {/* Category Badge */}
              <div className="mt-8">
                <span 
                  className="inline-block px-6 py-2 rounded-full text-white font-medium"
                  style={{ backgroundColor: categoryColor }}
                >
                  Browse {categoryName} Stories
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