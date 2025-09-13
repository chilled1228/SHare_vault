import { Metadata } from 'next'
import { BlogService } from '@/lib/blog-service'
import { BlogPost } from '@/types/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata: Metadata = {
  title: 'Blog - Shair Vault',
  description: 'Discover inspiring quotes, motivational content, and life wisdom on Shair Vault. Browse our collection of carefully curated blog posts.',
  keywords: 'blog, quotes, inspiration, motivation, wisdom, life lessons',
  openGraph: {
    title: 'Blog - Shair Vault',
    description: 'Discover inspiring quotes, motivational content, and life wisdom on Shair Vault.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Shair Vault',
    description: 'Discover inspiring quotes, motivational content, and life wisdom on Shair Vault.',
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
  
  return (
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
  )
}