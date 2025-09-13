import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 py-16">
          <div className="max-w-md mx-auto">
            <h1 
              className="text-6xl font-bold mb-4"
              style={{color: 'var(--primary)'}}
            >
              404
            </h1>
            
            <h2 
              className="text-2xl font-bold mb-4"
              style={{color: 'var(--foreground)'}}
            >
              Post Not Found
            </h2>
            
            <p 
              className="text-lg mb-8 leading-relaxed"
              style={{color: 'var(--muted-foreground)'}}
            >
              Sorry, the blog post you're looking for doesn't exist or may have been moved.
            </p>
            
            <div className="space-y-4">
              <Link
                href="/"
                className="btn btn-primary px-6 py-3 text-lg inline-block"
              >
                Go to Homepage
              </Link>
              
              <div>
                <Link
                  href="/blog"
                  className="btn btn-ghost px-6 py-3 text-lg inline-block"
                >
                  Browse All Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}