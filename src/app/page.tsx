import Header from '@/components/Header'
import FeaturedSection from '@/components/FeaturedSection'
import RecentPosts from '@/components/RecentPosts'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: 'var(--background)'}}>
      <Header />
      
      <main className="flex-1">

        {/* Featured Posts */}
        <div id="featured">
          <FeaturedSection />
        </div>

        {/* Recent Posts */}
        <RecentPosts />

        
      </main>

      <Footer />
    </div>
  )
}
