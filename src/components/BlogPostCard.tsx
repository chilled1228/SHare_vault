'use client'

import Link from 'next/link'
import { BlogPost } from '@/types/blog'

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="max-w-sm w-full bg-card rounded-xl overflow-hidden border border-primary-text/20 group cursor-pointer transition-all duration-300 hover:border-warm-orange/60 hover:shadow-md flex flex-col">
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
          <div className="flex items-center text-foreground-muted text-sm mt-4 pt-4 border-t border-primary-text/10">
            <p className="font-medium text-foreground mr-3">{post.authorName}</p>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}