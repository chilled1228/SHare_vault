'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, Twitter, Github, Linkedin, Rss } from 'lucide-react'
import { BlogService } from '@/lib/blog-service'

export default function Footer() {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await BlogService.getCategories()
        setCategories(fetchedCategories.slice(0, 5)) // Show only first 5 categories
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])
  // Helper function to convert category name to slug
  const categoryToSlug = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '-')
  }

  // Helper function to format category display name
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
  }

  return (
    <footer style={{backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)'}}>
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-2 lg:col-span-2">
              <h3 className="text-xl font-bold mb-4" style={{color: 'var(--primary)', fontFamily: 'Anton, sans-serif'}}>
                ShareVault
              </h3>
              <p className="mb-6 max-w-md" style={{color: 'var(--muted-foreground)'}}>
                Discover wisdom, inspiration, and motivation through our carefully curated collection of quotes and stories. 
                Join thousands finding daily inspiration.
              </p>
              
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4" style={{color: 'var(--foreground)'}}>Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="footer-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="footer-link">
                    All Stories
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="footer-link">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="footer-link">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Dynamic Categories */}
            <div>
              <h4 className="font-semibold mb-4" style={{color: 'var(--foreground)'}}>Categories</h4>
              <ul className="space-y-3">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category}>
                      <Link 
                        href={`/category/${categoryToSlug(category)}`} 
                        className="footer-link"
                      >
                        {formatCategoryName(category)}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link href="/category/motivation" className="footer-link">
                        Motivation
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/life-wisdom" className="footer-link">
                        Life Wisdom
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/personal-growth" className="footer-link">
                        Personal Growth
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/inspiration" className="footer-link">
                        Inspiration
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8" style={{borderTop: '1px solid var(--border)'}}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h4 className="font-semibold mb-2" style={{color: 'var(--foreground)'}}>Stay Inspired</h4>
              <p className="text-sm" style={{color: 'var(--muted-foreground)'}}>
                Get daily wisdom and motivation delivered to your inbox.
              </p>
            </div>
            <div className="flex-1 md:max-w-md">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 transition-colors"
                    style={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      color: 'var(--foreground)'
                    }}
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: 'var(--muted-foreground)'}} />
                </div>
                <button 
                  className="px-6 py-3 rounded-lg font-medium text-white transition-colors hover:opacity-90"
                  style={{background: 'linear-gradient(135deg, var(--accent-pink) 0%, var(--accent-purple) 100%)'}}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{borderTop: '1px solid var(--border)'}}>
          <p className="text-sm" style={{color: 'var(--muted-foreground)'}}>
            © 2025 ShareVault. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy-policy" className="footer-link text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="footer-link text-sm">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="footer-link text-sm">
              Cookie Policy
            </Link>
            <Link href="/disclaimer" className="footer-link text-sm">
              Disclaimer
            </Link>
            <Link href="/dmca" className="footer-link text-sm">
              DMCA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}