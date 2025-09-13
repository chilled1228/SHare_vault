import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BlogService } from '@/lib/blog-service'
import { BlogPost } from '@/types/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Shair Vault',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} - Shair Vault`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.authorName }],
    category: post.category,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.authorName],
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      tags: post.tags,
      images: post.imageUrl ? [
        {
          url: post.imageUrl,
          width: 800,
          height: 600,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)
  
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
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shair Vault',
    },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: post.imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourdomain.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.content.split(' ').length,
    timeRequired: `PT${post.readTime}M`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                <div className="mb-12">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="article-content">
                <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
              </div>

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
          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}

function formatContent(content: string): string {
  // Convert markdown-style content to HTML with better typography
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold mb-6 mt-8" style="color: var(--primary)">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mb-4 mt-8" style="color: var(--primary)">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-bold mb-4 mt-6" style="color: var(--primary)">$1</h3>')
    .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-bold" style="color: var(--primary)">$1</strong>')
    .replace(/^\*(.*?)\*/gm, '<em>$1</em>')
    .replace(/^(\d+\.)\s/gm, '<span class="quote-number" style="color: var(--primary); font-weight: bold;">$1</span> ')
    .replace(/- \*(.*?)\*/gm, '- <em style="color: var(--muted-foreground)">$1</em>')
    .replace(/^(.+)$/gm, '<p class="mb-6 leading-relaxed">$1</p>')
}