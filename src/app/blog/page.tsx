import { Metadata } from 'next'
import { getCanonicalUrl, getImageUrl, getBlogUrl } from '@/lib/seo-utils'
import { BlogService } from '@/lib/blog-service'
import { BlogPost } from '@/types/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogPostCard from '@/components/BlogPostCard'

export const revalidate = 60 // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Blog - Inspiring Stories and Life Wisdom',
  description: 'Explore inspiring stories, life wisdom, and personal growth articles. Find motivation and self-improvement tips to transform your life.',
  keywords: ['blog', 'inspiring stories', 'life wisdom', 'personal growth', 'motivation', 'self-improvement', 'philosophy', 'mindfulness'],
  openGraph: {
    title: 'Blog - Inspiring Stories and Life Wisdom | ShareVault',
    description: 'Read inspiring stories, life wisdom, and personal growth articles. Discover motivation, self-improvement tips, and philosophical insights to transform your life.',
    type: 'website',
    url: getBlogUrl(),
    images: [
      {
        url: getImageUrl('og-image-blog.jpg'),
        width: 1200,
        height: 630,
        alt: 'ShareVault Blog - Inspiring Stories and Life Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Inspiring Stories and Life Wisdom | ShareVault',
    description: 'Read inspiring stories, life wisdom, and personal growth articles.',
    images: [getImageUrl('og-image-blog.jpg')],
  },
  alternates: {
    canonical: getBlogUrl(),
    languages: {
      'en-US': getBlogUrl(),
      'x-default': getBlogUrl(),
    },
  },
}

async function getAllPosts(): Promise<BlogPost[]> {
  try {
    return await BlogService.getPosts(50)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  
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
        "name": "Blog",
        "item": getBlogUrl()
      }
    ]
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ShareVault Blog",
    "description": "Read inspiring stories, life wisdom, and personal growth articles.",
    "url": getBlogUrl(),
    "publisher": {
      "@type": "Organization",
      "name": "ShareVault",
      "url": getCanonicalUrl()
    },
    "inLanguage": "en-US"
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      
      <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
        <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)' }}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily: 'Anton, sans-serif'}}>
              Blog
            </h1>
            <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Discover inspiring stories, life wisdom, and personal growth insights
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 
                  className="text-2xl font-bold mb-4"
                  style={{color: 'var(--foreground)'}}
                >
                  No posts available yet
                </h2>
                <p style={{color: 'var(--muted-foreground)'}}>
                  Check back soon for inspiring content!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  )
}