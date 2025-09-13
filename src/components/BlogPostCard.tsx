'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="max-w-sm w-full bg-card rounded-xl overflow-hidden border group cursor-pointer transition-all duration-300 hover:border-warm-orange/60 hover:shadow-md flex flex-col" style={{ borderColor: '#1a1a1a' }}>
        {/* Image Section */}
        <div className="relative p-3">
          <div className="relative h-80 overflow-hidden rounded-t-lg">
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                loading="lazy"
              />
            ) : (
              <div 
                className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
                style={{ backgroundColor: 'var(--muted)' }}
              >
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
          </div>
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