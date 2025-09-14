'use client'

import { useState } from 'react'
import { Copy, Share2, Check, Quote } from 'lucide-react'

interface EnhancedBlockquoteProps {
  content: string
  postTitle?: string
  postUrl?: string
}

export default function EnhancedBlockquote({ content, postTitle, postUrl }: EnhancedBlockquoteProps) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: postTitle ? `Quote from "${postTitle}"` : 'Inspiring Quote',
      text: content,
      url: postUrl || window.location.href
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } else {
        // Fallback to copying share text
        const shareText = `"${content}"\n\n${shareData.title}\n${shareData.url}`
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      console.error('Failed to share:', error)
    }
  }

  return (
    <div 
      className="group relative my-4 p-4 border-l-4 transition-all duration-200"
      style={{
        backgroundColor: 'var(--card)',
        borderLeftColor: 'var(--primary)',
        border: '1px solid var(--accent-pink)',
        borderLeftWidth: '4px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(255, 52, 148, 0.1)'
      }}
    >
      {/* Quote Content */}
      <div className="flex items-start gap-3">
        {/* Quote Icon */}
        <div className="flex-shrink-0 mt-1">
          <Quote className="w-5 h-5" style={{ color: 'var(--primary)' }} />
        </div>

        {/* Content and Actions */}
        <div className="flex-1 min-w-0">
          <blockquote 
            className="text-lg font-medium leading-relaxed mb-3 blockquote-content"
            style={{ color: 'var(--foreground)' }}
          >
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </blockquote>

          <style jsx>{`
            .blockquote-content :global(em) {
              font-style: normal;
              font-weight: 400;
              font-size: 0.875rem;
              color: var(--muted-foreground);
              display: block;
              margin-top: 0.75rem;
              padding-top: 0.5rem;
              border-top: 1px solid var(--accent-pink);
            }
            .blockquote-content {
              font-style: italic;
              font-weight: 600;
              color: var(--foreground);
              font-size: 1.125rem;
              line-height: 1.6;
            }
          `}</style>

          {/* Action Buttons - More visible with brand colors */}
          <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: copied ? 'var(--primary)' : 'var(--accent-pink-soft)',
                color: copied ? 'white' : 'var(--primary)',
                border: '1px solid var(--accent-pink)',
                boxShadow: copied ? '0 2px 4px rgba(255, 52, 148, 0.2)' : 'none'
              }}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: shared ? 'var(--primary)' : 'var(--accent-pink-soft)',
                color: shared ? 'white' : 'var(--primary)',
                border: '1px solid var(--accent-pink)',
                boxShadow: shared ? '0 2px 4px rgba(255, 52, 148, 0.2)' : 'none'
              }}
            >
              {shared ? (
                <>
                  <Check className="w-3 h-3" />
                  Shared!
                </>
              ) : (
                <>
                  <Share2 className="w-3 h-3" />
                  Share
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}