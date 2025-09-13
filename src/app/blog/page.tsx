import { Metadata } from 'next'
import { BlogService } from '@/lib/blog-service'
import { BlogPost } from '@/types/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata: Metadata = {
  title: 'Blog - Inspiring Stories and Life Wisdom',
  description: 'Read inspiring stories, life wisdom, and personal growth articles. Discover motivation, self-improvement tips, and philosophical insights to transform your life.',
  keywords: ['blog', 'inspiring stories', 'life wisdom', 'personal growth', 'motivation', 'self-improvement', 'philosophy', 'mindfulness'],
  openGraph: {
    title: 'Blog - Inspiring Stories and Life Wisdom | Shair Vault',
    description: 'Read inspiring stories, life wisdom, and personal growth articles. Discover motivation, self-improvement tips, and philosophical insights to transform your life.',
    type: 'website',
    url: 'https://shairvault.com/blog',
    images: [
      {
        url: '/og-image-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Shair Vault Blog - Inspiring Stories and Life Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Inspiring Stories and Life Wisdom | Shair Vault',
    description: 'Read inspiring stories, life wisdom, and personal growth articles.',
    images: ['/og-image-blog.jpg'],
  },
  alternates: {
    canonical: 'https://shairvault.com/blog',
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
        "item": "https://shairvault.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://shairvault.com/blog"
      }
    ]
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Shair Vault Blog",
    "description": "Read inspiring stories, life wisdom, and personal growth articles.",
    "url": "https://shairvault.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Shair Vault",
      "url": "https://shairvault.com"
    },
    "inLanguage": "en-US"
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, blogSchema]) }}
      />
      
      <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
        <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{color: 'var(--primary)'}}
            >
              Our Blog
            </h1>
            <p 
              className="text-xl md:text-2xl max-w-3xl mx-auto"
              style={{color: 'var(--foreground-muted)'}}
            >
              Discover inspiring quotes, motivational content, and life wisdom to brighten your day and fuel your journey.
            </p>
          </div>
        </section>

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