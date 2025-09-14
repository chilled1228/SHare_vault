'use client'

import { useMemo } from 'react'
import EnhancedBlockquote from './EnhancedBlockquote'

interface BlogContentRendererProps {
  content: string
  postTitle: string
  postSlug: string
}

export default function BlogContentRenderer({ content, postTitle, postSlug }: BlogContentRendererProps) {
  const postUrl = `https://shairvault.com/${postSlug}`

  const renderedContent = useMemo(() => {
    // Extract both markdown and HTML blockquotes
    const markdownBlockquoteRegex = /^> (.*$)/gm
    const htmlBlockquoteRegex = /<blockquote>([\s\S]*?)<\/blockquote>/g
    const blockquotes: string[] = []
    let processedContent = content

    // Extract markdown blockquotes (> text)
    let match
    while ((match = markdownBlockquoteRegex.exec(content)) !== null) {
      blockquotes.push(match[1])
    }

    // Extract HTML blockquotes and preserve structure
    while ((match = htmlBlockquoteRegex.exec(content)) !== null) {
      // Keep the HTML structure but clean up formatting
      let cleanContent = match[1]
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
      blockquotes.push(cleanContent)
    }

    // Replace markdown blockquotes with placeholders
    processedContent = content.replace(markdownBlockquoteRegex, (_, quote) => {
      const index = blockquotes.indexOf(quote)
      return `__BLOCKQUOTE_${index}__`
    })

    // Replace HTML blockquotes with placeholders
    processedContent = processedContent.replace(htmlBlockquoteRegex, (match, quote) => {
      let cleanContent = quote
        .replace(/\s+/g, ' ')
        .trim()
      const index = blockquotes.indexOf(cleanContent)
      return `__BLOCKQUOTE_${index}__`
    })

    // Apply other formatting
    const formatted = processedContent
      // Handle headings
      .replace(/^# (.*$)/gm, '<h1 class="text-4xl md:text-5xl font-bold mb-6 mt-12 leading-tight" style="color: var(--primary);">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-3xl md:text-4xl font-bold mb-5 mt-10 leading-tight" style="color: var(--primary);">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-2xl md:text-3xl font-bold mb-4 mt-8 leading-tight" style="color: var(--primary);">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-xl md:text-2xl font-bold mb-4 mt-6 leading-tight" style="color: var(--primary);">$1</h4>')
      
      // Handle text formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold" style="color: var(--primary);">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Handle numbered lists (quotes)
      .replace(/^(\d+\.\s)(.*)$/gm, '<div class="mb-4"><span class="quote-number font-bold text-lg mr-2" style="color: var(--primary);">$1</span><span class="leading-relaxed">$2</span></div>')
      
      // Handle unordered lists
      .replace(/^- (.*)$/gm, '<li class="mb-2 ml-4 leading-relaxed">$1</li>')
      
      // Wrap consecutive list items in ul tags
      .replace(/(<li.*?<\/li>\s*)+/g, '<ul class="list-disc list-inside mb-6 space-y-2">$&</ul>')
      
      // Handle paragraphs (exclude lines with HTML tags)
      .replace(/^(?!<[h1-6]|<div|<ul|<li|__BLOCKQUOTE_)(.+)$/gm, '<p class="mb-6 leading-relaxed text-lg" style="color: var(--foreground);">$1</p>')
      
      // Clean up double line breaks
      .replace(/\n\n/g, '\n')

    // Split by blockquote placeholders and render
    const parts = formatted.split(/(__BLOCKQUOTE_\d+__)/g)
    
    return parts.map((part, index) => {
      const blockquoteMatch = part.match(/^__BLOCKQUOTE_(\d+)__$/)
      if (blockquoteMatch) {
        const blockquoteIndex = parseInt(blockquoteMatch[1])
        const blockquoteContent = blockquotes[blockquoteIndex]
        return (
          <EnhancedBlockquote
            key={`blockquote-${index}`}
            content={blockquoteContent}
            postTitle={postTitle}
            postUrl={postUrl}
          />
        )
      }
      
      // Regular HTML content
      if (part.trim()) {
        return (
          <div
            key={`content-${index}`}
            dangerouslySetInnerHTML={{ __html: part }}
          />
        )
      }
      
      return null
    })
  }, [content, postTitle, postUrl])

  return <div className="article-content prose prose-lg max-w-none">{renderedContent}</div>
}