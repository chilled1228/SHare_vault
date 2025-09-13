'use client'

import Link from 'next/link'
import { BlogPost } from '@/types/blog'

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="max-w-sm w-full bg-card rounded-xl overflow-hidden border group cursor-pointer transition-all duration-300 hover:border-warm-orange/60 hover:shadow-md flex flex-col" style={{ borderColor: '#1a1a1a' }}>
        {/* Image Section */}
        <div className="relative p-3">
          <div 
            className="h-80 bg-cover bg-center rounded-t-lg transition-transform duration-300 group-hover:scale-[1.02]" 
            style={{ backgroundImage: `url(${post.imageUrl})` }} 
          />
        </div>
        
        {/* Bottom Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-foreground group-hover:text-bold-red-orange transition-colors duration-300 leading-tight">
              {post.title}
            </h3>
          </div>
          <div className="flex items-center text-sm mt-4 pt-4 border-t" style={{ borderColor: '#1a1a1a' }}>
            <p className="font-medium mr-3" style={{ color: '#1a1a1a' }}>{post.authorName}</p>
            <p style={{ color: '#1a1a1a' }}>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}