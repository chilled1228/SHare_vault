import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BlogService } from '@/lib/blog-service'
import { BlogPost } from '@/types/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RelatedPosts from '@/components/RelatedPosts'
import BlogContentRenderer from '@/components/BlogContentRenderer'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    return await BlogService.getPostBySlug(slug)
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const posts = await BlogService.getPosts(100)
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Shair Vault',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title}`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.authorName, url: `https://shairvault.com/author/${post.authorName.toLowerCase().replace(/\s+/g, '-')}` }],
    category: post.category,
    creator: post.authorName,
    publisher: 'Shair Vault',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://shairvault.com/${post.slug}`,
      siteName: 'Shair Vault',
      locale: 'en_US',
      authors: [post.authorName],
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      section: post.category,
      tags: post.tags,
      images: post.imageUrl ? [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        }
      ] : [
        {
          url: 'https://shairvault.com/og-image-blog.jpg',
          width: 1200,
          height: 630,
          alt: `${post.title} - Shair Vault`,
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@shairvault',
      creator: '@shairvault',
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [
        {
          url: post.imageUrl,
          alt: post.title,
        }
      ] : [
        {
          url: 'https://shairvault.com/og-image-blog.jpg',
          alt: `${post.title} - Shair Vault`,
        }
      ],
    },
    alternates: {
      canonical: `https://shairvault.com/${post.slug}`,
    },
    other: {
      'article:author': post.authorName,
      'article:section': post.category,
      'article:tag': post.tags.join(','),
      'article:published_time': post.createdAt.toISOString(),
      'article:modified_time': post.updatedAt.toISOString(),
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl ? {
      '@type': 'ImageObject',
      url: post.imageUrl,
      width: 800,
      height: 600
    } : undefined,
    author: {
      '@type': 'Person',
      name: post.authorName,
      url: `https://shairvault.com/author/${post.authorName.toLowerCase().replace(/\s+/g, '-')}`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shair Vault',
      url: 'https://shairvault.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shairvault.com/logo.png'
      }
    },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://shairvault.com/${post.slug}`,
    },
    keywords: post.tags,
    articleSection: post.category,
    wordCount: post.content.split(' ').length,
    timeRequired: `PT${post.readTime}M`,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://shairvault.com/blog',
      name: 'Shair Vault Blog'
    },
    about: {
      '@type': 'Thing',
      name: post.category
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://shairvault.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://shairvault.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://shairvault.com/${post.slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
        <Header />
        
        <main className="flex-1">
          {/* Breadcrumb Navigation */}
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm" style={{color: 'var(--muted-foreground)'}}>
              <Link href="/" className="hover:opacity-80" style={{color: 'var(--primary)'}}>
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:opacity-80" style={{color: 'var(--primary)'}}>
                Blog
              </Link>
              <span>/</span>
              <span className="truncate">{post.title}</span>
            </nav>
          </div>

          {/* Hero Section */}
          <article className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Article Header */}
              <header className="text-center mb-8">
                <div className="mb-6">
                  <span 
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4"
                    style={{
                      backgroundColor: 'var(--accent-pink-soft)',
                      color: 'var(--primary)'
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{color: 'var(--primary)'}}
                >
                  {post.title}
                </h1>
                
                <p 
                  className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto"
                  style={{color: 'var(--foreground-muted)'}}
                >
                  {post.excerpt}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm" style={{color: 'var(--muted-foreground)'}}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{backgroundColor: 'var(--primary)'}}>
                      {post.authorName.charAt(0).toUpperCase()}
                    </div>
                    <span>{post.authorName}</span>
                  </div>
                  <span className="hidden sm:block">•</span>
                  <time dateTime={post.createdAt.toISOString()}>
                    {formatDate(post.createdAt)}
                  </time>
                  <span className="hidden sm:block">•</span>
                  <span>{post.readTime} min read</span>
                </div>
              </header>

              {/* Featured Image */}
              {post.imageUrl && (
                <div className="mb-12 relative">
                  <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      priority={true}
                    />
                  </div>
                </div>
              )}

              {/* Article Content */}
              <BlogContentRenderer 
                content={post.content}
                postTitle={post.title}
                postSlug={post.slug}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t" style={{borderColor: 'var(--border)'}}>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{
                        backgroundColor: 'var(--accent-blue-soft)',
                        color: 'var(--primary)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div 
                className="mt-8 p-6 rounded-xl"
                style={{backgroundColor: 'var(--card)', border: '1px solid var(--border)'}}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{backgroundColor: 'var(--primary)'}}>
                    {post.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2" style={{color: 'var(--foreground)'}}>
                      {post.authorName}
                    </h3>
                    <p style={{color: 'var(--muted-foreground)'}}>
                      Passionate writer sharing insights about {post.category.toLowerCase()}, inspiration, and life wisdom.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-12 flex justify-center">
                <Link
                  href="/"
                  className="btn btn-primary px-6 py-3 text-lg"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
            
            {/* Related Posts Section */}
            <div className="container mx-auto px-4 py-16">
              <RelatedPosts currentPost={post} limit={3} />
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}

